import React from "react";
import { useForm } from "react-hook-form";
import FormLayout from "../../client/Ui/FormLayout";

const editProfile: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSave = () => {
    return null;
  };
  return (
    <FormLayout title="Edit Profile">
      <form onSubmit={onSave}>
        
      </form>
    </FormLayout>
  );
};

export default editProfile;
