import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import FormField from "../../client/Ui/FormField";
import FormLayout from "../../client/Ui/FormLayout";
import Loader from "../../client/Ui/Loader";
import { trpc } from "../../utils/trpc";

const AddWork: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    getValues,
    formState: { errors },
  } = useForm();
  const onSave = () => {
    let { company, role, description } = getValues();
    onUpdate.mutate({
      company: company,
      description: description,
      role: role,
    });
  };
  const onUpdate = trpc.auth.addUserWork.useMutation();
  return (
    <FormLayout title="Add Work Experience">
      <form onSubmit={handleSubmit(onSave)}>
        <FormField
          inputProps={{ ...register("company") }}
          label="company"
          type="text"
          placeholder="Enter Company Name"
        />
        <FormField
          inputProps={{ ...register("role") }}
          label="role"
          type="text"
          placeholder="Enter your job title"
        />
        <FormField
          inputProps={{ ...register("description") }}
          label="description"
          type="text"
          placeholder="Explain your role at the company"
        />
        <div className="submit flex rounded-xl bg-rose-400">
          {onUpdate.isLoading && <Loader />}
          <input
            className="p-4 text-3xl text-white"
            value={onUpdate.isLoading ? "Saving" : "Save"}
            type="submit"
          />
        </div>
      </form>
    </FormLayout>
  );
};

export default AddWork;
