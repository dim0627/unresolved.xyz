---
title: "@nrwl/expoでeas buildしようとしてかなり躓いたので供養します"
date: "2022-05-30T00:00+09:00"
tags:
  - "React Native"
  - "Expo"
  - "TIL"
---

最近Nx + NestJS + React Nativeで開発していて、Classic BuildからEAS Buildに移行しようとしたらとても躓いたので書いておきます。

## idb/build/index.cjs is not computed

1つ目はこちらです。

``` sh
> Task :app:generatePackageList
> Task :app:preBuild
> Task :app:preReleaseBuild
> Task :app:bundleReleaseJsAndAssets
[stderr] warn Package firebase-admin has been ignored because it contains invalid configuration. Reason: Package subpath './package.json' is not defined by "exports" in /home/expo/workingdir/build/apps/app/node_modules/firebase-admin/package.json
[stderr] ? android: block-permissions: No permissions provided
warning: the transform cache was reset.
                    Welcome to Metro!
              Fast - Scalable - Integrated
[stderr] error SHA-1 for file /home/expo/workingdir/build/apps/app/node_modules/idb/build/index.cjs (/home/expo/workingdir/build/apps/app/node_modules/idb/build/index.cjs) is not computed.
[stderr]          Potential causes:
[stderr]            1) You have symlinks in your project - watchman does not follow symlinks.
[stderr]            2) Check `blockList` in your metro.config.js and make sure it isn't excluding the file path.
ReferenceError: SHA-1 for file /home/expo/workingdir/build/apps/app/node_modules/idb/build/index.cjs (/home/expo/workingdir/build/apps/app/node_modules/idb/build/index.cjs) is not computed.
         Potential causes:
           1) You have symlinks in your project - watchman does not follow symlinks.
           2) Check `blockList` in your metro.config.js and make sure it isn't excluding the file path.
    at DependencyGraph.getSha1 (/home/expo/workingdir/build/apps/app/node_modules/metro/src/node-haste/DependencyGraph.js:191:13)
    at Transformer.transformFile (/home/expo/workingdir/build/apps/app/node_modules/metro/src/DeltaBundler/Transformer.js:104:23)
    at Bundler.transformFile (/home/expo/workingdir/build/apps/app/node_modules/metro/src/Bundler.js:57:30)
    at async Object.transform (/home/expo/workingdir/build/apps/app/node_modules/metro/src/lib/transformHelpers.js:101:12)
    at async processModule (/home/expo/workingdir/build/apps/app/node_modules/metro/src/DeltaBundler/traverseDependencies.js:137:18)
    at async addDependency (/home/expo/workingdir/build/apps/app/node_modules/metro/src/DeltaBundler/traverseDependencies.js:230:18)
    at async Promise.all (index 10)
    at async processModule (/home/expo/workingdir/build/apps/app/node_modules/metro/src/DeltaBundler/traverseDependencies.js:198:5)
    at async addDependency (/home/expo/workingdir/build/apps/app/node_modules/metro/src/DeltaBundler/traverseDependencies.js:230:18)
    at async Promise.all (index 0)
info Run CLI with --verbose flag for more details.
> Task :app:bundleReleaseJsAndAssets FAILED
[stderr] FAILURE: Build failed with an exception.
[stderr] * What went wrong:
[stderr] Execution failed for task ':app:bundleReleaseJsAndAssets'.
[stderr] > Process 'command 'node'' finished with non-zero exit value 1
[stderr] * Try:
[stderr] > Run with --stacktrace option to get the stack trace.
[stderr] > Run with --info or --debug option to get more log output.
[stderr] > Run with --scan to get full insights.
[stderr] * Get more help at https://help.gradle.org
[stderr] BUILD FAILED in 5m 15s
```

metroがデフォルトだと `.cjs` を読めないので、 `metro.config.js` に

``` ts
defaultConfig.resolver.assetExts.push("cjs");
```

を追記すれば解決します。

全体はおそらくこのような形になります。

``` ts
const { withNxMetro } = require('@nrwl/expo');
const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

module.exports = (async () => {
  defaultConfig.transformer.babelTransformerPath = require.resolve(
    'react-native-svg-transformer'
  );
  defaultConfig.resolver.assetExts = defaultConfig.resolver.assetExts.filter(
    (ext) => ext !== 'svg'
  );
  defaultConfig.resolver.sourceExts.push('svg');
  defaultConfig.resolver.assetExts.push("cjs");
  return withNxMetro(defaultConfig, {
    // Change this to true to see debugging info.
    // Useful if you have issues resolving modules
    debug: false,
    // all the file extensions used for imports other than 'ts', 'tsx', 'js', 'jsx'
    extensions: [],
    // the project root to start the metro server
    projectRoot: __dirname,
    // Specify any additional (to projectRoot) watch folders, this is used to know which files to watch
    watchFolders: []
  });
})();
```

- <https://bytemeta.vip/repo/firebase/firebase-js-sdk/issues/6253>
  - リンクが見れなくなったかもしれません・・・

## Invalid bitcode version

2つ目がこちらです。

``` sh

❌  ld: could not reparse object file in bitcode bundle: 'Invalid bitcode version (Producer: '1316.0.21.2.3_0' Reader: '1300.0.29.3_0')', using libLTO version 'LLVM version 13.0.0, (clang-1300.0.29.3)' for architecture arm64

❌  clang: error: linker command failed with exit code 1 (use -v to see invocation)

▸ ** ARCHIVE FAILED **
▸ The following build commands failed:
▸  Ld /Users/expo/Library/Developer/Xcode/DerivedData/GOFOOD-bzcbywoupmkkdtcxarofoooxnnmm/Build/Intermediates.noindex/ArchiveIntermediates/GOFOOD/InstallationBuildProductsLocation/Applications/GOFOOD.app/GOFOOD normal (in target 'GOFOOD' from project 'GOFOOD')
▸ (1 failure)
** ARCHIVE FAILED **
The following build commands failed:
 Ld /Users/expo/Library/Developer/Xcode/DerivedData/GOFOOD-bzcbywoupmkkdtcxarofoooxnnmm/Build/Intermediates.noindex/ArchiveIntermediates/GOFOOD/InstallationBuildProductsLocation/Applications/GOFOOD.app/GOFOOD normal (in target 'GOFOOD' from project 'GOFOOD')
(1 failure)
Exit status: 65
+-------------+-------------------------+
|           Build environment           |
+-------------+-------------------------+
| xcode_path  | /Applications/Xcode.app |
| gym_version | 2.185.1                 |
| sdk         | iPhoneOS15.0.sdk        |
+-------------+-------------------------+
Looks like fastlane ran into a build/archive error with your project
It's hard to tell what's causing the error, so we wrote some guides on how
to troubleshoot build and signing issues: https://docs.fastlane.tools/codesigning/getting-started/
Before submitting an issue on GitHub, please follow the guide above and make
sure your project is set up correctly.
fastlane uses `xcodebuild` commands to generate your binary, you can see the
the full commands printed out in yellow in the above log.
Make sure to inspect the output above, as usually you'll find more error information there
[stderr] [!] Error building the application - see the log above
Error: Fastlane build failed with unknown error. Please refer to the "Run fastlane" and "Xcode Logs" phases.
Fastlane errors in most cases are not printed at the end of the output, so you may not find any useful information in the last lines of output when looking for an error message.
```

これはXcodeのバージョンに差異があると発生します。

`eas.json` に

``` sh
      "ios": {
        "image": "latest"
      },
```

のように設定すれば通ります。

- <https://github.com/expo/eas-cli/issues/1079>
