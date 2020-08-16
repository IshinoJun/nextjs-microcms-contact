import React from "react";
import style from "./index.module.scss";
import { Grid, TextField, Button } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import { NextPage } from "next";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers";
import Contact from "../../models/Contact";
import { useRouter } from "next/router";

const ContactIndex: NextPage = () => {
  const router = useRouter();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("名前は必須項目です"),
    email: Yup.string()
      .email("正しいメールアドレスではありません")
      .required("メールアドレスは必須です"),
    body: Yup.string().required("お問い合わせ内容は必須です。"),
  });

  const onSubmit = async (contact: Contact): Promise<void> => {
    try {
      await fetch(baseUrl + "/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(contact),
      }).then((res) => {
        if (!res.ok) {
          throw Error(`${res.status} ${res.statusText}`);
        }
      });

      void router.push("/contact/success");
    } catch (err) {
      void router.push("/contact/error");
    }
  };

  const { control, handleSubmit, errors } = useForm<Contact>({
    mode: "onBlur",
    resolver: yupResolver(validationSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className={style.form}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Controller
            as={TextField}
            control={control}
            variant="outlined"
            required
            fullWidth
            id="name"
            label="お名前"
            name="name"
            autoComplete="name"
            defaultValue=""
            error={!!errors.name?.message}
          />
          {errors.name && <p className={style.error}>{errors.name.message}</p>}
        </Grid>
        <Grid item xs={12}>
          <Controller
            as={TextField}
            control={control}
            variant="outlined"
            required
            fullWidth
            id="email"
            label="メールアドレス"
            name="email"
            autoComplete="email"
            defaultValue=""
            error={!!errors.email?.message}
          />
          {errors.email && (
            <p className={style.error}>{errors.email.message}</p>
          )}
        </Grid>
        <Grid item xs={12}>
          <Controller
            as={TextField}
            control={control}
            variant="outlined"
            required
            fullWidth
            multiline
            rows={6}
            name="body"
            label="内容"
            id="body"
            autoComplete="body"
            defaultValue=""
            error={!!errors.body?.message}
          />
          {errors.body && <p className={style.error}>{errors.body.message}</p>}
        </Grid>
      </Grid>
      <Button
        type="submit"
        variant="contained"
        className={style.send}
        aria-label="送信"
      >
        送信
      </Button>
    </form>
  );
};

export default ContactIndex;
