import React from "react";
import { useForm } from "react-hook-form";
import FormField from "../../client/Ui/FormField";
import FormLayout from "../../client/Ui/FormLayout";
import Loader from "../../client/Ui/Loader";
import { trpc } from "../../utils/trpc";

const AddEducation: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    getValues,
    formState: { errors },
  } = useForm();
  const onSave = () => {
    let { institution, course, description } = getValues();
    onUpdate.mutate({
      institution: institution,
      description: description,
      course: course,
    });
  };
  const onUpdate = trpc.auth.addUserEducation.useMutation();
  return (
    <FormLayout title="Add Education">
      <form onSubmit={handleSubmit(onSave)}>
        <FormField
          inputProps={{ ...register("course") }}
          label="course"
          type="text"
          placeholder="Enter course name"
        />
        <FormField
          inputProps={{ ...register("institution") }}
          label="institution"
          type="text"
          placeholder="Enter institution name"
        />
        <FormField
          inputProps={{ ...register("description") }}
          label="description"
          type="text"
          placeholder="Explain your course"
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

export default AddEducation;
