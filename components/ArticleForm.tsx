import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type FormInputs = {
  title: string;
  content: string;
};

const schema = yup.object().shape({
  title: yup.string().required(),
  content: yup.string().required(),
});

export type ArticleFormProps = {
  onSubmit: (FormInputs) => void;
};

export const ArticleForm: React.FC<ArticleFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="field">
        <div className="control">
          <label className="label">Title</label>
          <input className="input" {...register("title")} />
        </div>
        <p className="help is-danger is-size-6">{errors.title?.message}</p>
      </div>

      <div className="field">
        <div className="control">
          <label className="label">Content</label>
          <textarea className="textarea" {...register("content")} />
        </div>
        <p className="help is-danger is-size-6">{errors.content?.message}</p>
      </div>

      <input className="button is-primary" type="submit" value="Submit" />
    </form>
  );
};
