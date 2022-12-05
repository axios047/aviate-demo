import React, { useEffect, useState } from "react";
import { Plus } from "react-feather";
import { useForm } from "react-hook-form";
import FormField from "../../client/Ui/FormField";
import FormLayout from "../../client/Ui/FormLayout";
import Loader from "../../client/Ui/Loader";
import SearchableDropdown from "../../client/Ui/SearchableDropdown";
import { trpc } from "../../utils/trpc";

const EditSkills: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const onSave = () => {
    onUpdate.mutate({
      skillId: selectedSkillId,
    });
    refetch();
  };
  const {
    data: currentSkills,
    error,
    status,
    refetch,
  } = trpc.auth.getUserSkills.useQuery();
  useEffect(() => {
    console.log(currentSkills, watch("skill"), "data");
  }, [currentSkills]);
  const onUpdate = trpc.auth.addUserSkill.useMutation();
  const [selectedSkillId, setSkillId] = useState("");
  const { data: searchSkillsResult } = trpc.general.searchForSkills.useQuery(
    {
      searchTerm: watch("skill"),
    },
    {
      enabled: watch("skill") !== (null || ""),
      // refetchOnReconnect: true,
      // refetchOnMount: true,
    }
  );
  return (
    <FormLayout title="Add Education">
      <div className="current-skills">
        {!currentSkills || (currentSkills.length === 0 && "No skills added")}
        {currentSkills?.map(({ skill }) => {
          return (
            <button className="skill-tag mr-2 rounded-full border border-rose-400 bg-rose-100 px-4 py-2">
              {skill.name}
            </button>
          );
        })}
      </div>
      <form
        className="flex items-center justify-between"
        onSubmit={handleSubmit(onSave)}
      >
        <SearchableDropdown
          inputProps={{ ...register("skill") }}
          label="skill"
          placeholder="Enter skill name"
          searchResults={searchSkillsResult}
          setVal={setValue}
          setSkillId={setSkillId}
        />
        <div className="submit ml-4 flex items-center rounded-xl bg-rose-400 p-4 text-white">
          {onUpdate.isLoading && <Loader />}
          <Plus />
          &ensp;
          <input
            className="text-3xl text-white"
            value={onUpdate.isLoading ? "Adding" : "Add"}
            type="submit"
          />
        </div>
      </form>
    </FormLayout>
  );
};

export default EditSkills;
