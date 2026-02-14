---
title: "React Hook Formのresetメソッドでnumber型のフィールドをリセットするいい方法がわかりません"
date: "2021-10-21T00:00+09:00"
tags:
  - "React"
  - "TIL"
---

こうやっているのですが、何がスマートなのでしょうか・・・？

```js
const AnyForm: React.VFC<Props> = ({ onSubmit }) => {
  const { register, handleSubmit, reset } = useForm<{ size: number }>();

  const submit = async () => {
    await handleSubmit(onSubmit)();
    reset({
      size: "" as unkown as number
    });
  };

  // blah-blah-blah
}
```

- [useForm - reset | React Hook Form - Simple React forms validation](https://react-hook-form.com/api/useform/reset/)
