import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import FormField from "../../client/Ui/FormField";
import FormLayout from "../../client/Ui/FormLayout";
import Loader from "../../client/Ui/Loader";
import { trpc } from "../../utils/trpc";

const editProfile: React.FC = () => {
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    getValues,
    formState: { errors },
  } = useForm();
  const onSave = () => {
    let { email, image, name } = getValues();
    onUpdate.mutate({
      email: email,
      name: name,
      image: image,
    });
  };

  useEffect(() => {
    reset({
      image: session?.user?.image,
      name: session?.user?.name,
      email: session?.user?.email,
    });
  }, [session]);
  const getSrc = () => {
    let src = watch("image");
    if (src != undefined && src.includes("http")) {
      return src;
    } else {
      return "https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png";
    }
  };
  const onUpdate = trpc.auth.updateUser.useMutation();
  return (
    <FormLayout title="Edit Profile">
      <form onSubmit={handleSubmit(onSave)}>
        <div className="img relative h-24 w-24 overflow-hidden rounded-full">
          <Image alt="profile-pic" src={getSrc()} fill />
        </div>
        <FormField
          inputProps={{ ...register("image") }}
          label="image"
          type="text"
          placeholder="Enter image url"
        />
        <FormField
          inputProps={{ ...register("name") }}
          label="name"
          type="text"
          placeholder="Enter your name"
        />
        <FormField
          inputProps={{ ...register("email") }}
          label="email"
          type="text"
          placeholder="Enter your email"
        />
        <div className="submit flex rounded-xl bg-rose-400">
          {onUpdate.isLoading && <Loader/>}
          <input
            className="p-4 text-3xl text-white"
            value={onUpdate.isLoading?"Saving":"Save"}
            type="submit"
          />
        </div>
      </form>
    </FormLayout>
  );
};

export default editProfile;
