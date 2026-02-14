---
title: "Material-UIで配列を複数のTextFieldに分割して処理する方法"
date: "2021-07-01T00:00+09:00"
tags:
  - "React"
  - "TIL"
  - "Material UI"
---

``` jsx
<Paper className={props.styles.choices} variant="outlined">
  {[0, 1, 2].map((i) => (
    <FormItem key={i}>
      <fieldset name="japaneseChoices" className={props.styles.fieldSet}>
        <Controller
          as={TextField}
          id={`japaneseChoices${i}`}
          name={`japaneseChoices.${i}`}
          label={`${I18n.t('attributes.word.japaneseChoices')} ${i + 1}`}
          fullWidth
          control={props.control}
          defaultValue={props.word.japaneseChoices && props.word.japaneseChoices[i]}
          onChange={console.log}
        />
      </fieldset>
    </FormItem>
  ))}
</Paper>
```

- [React Hook Form - Array Fields - CodeSandbox](https://codesandbox.io/s/6j1760jkjk)
