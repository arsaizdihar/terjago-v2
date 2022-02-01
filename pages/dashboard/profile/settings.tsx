import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import SelectSearch from "react-select-search";
import { toast } from "react-toastify";
import TextInput from "~/components/common/form/TextInput";
import { usePageData } from "~/core/pageData";
import db from "~/core/Prisma";
import { withSession } from "~/core/ServerSide";
import useMe from "~/hooks/useMe";
import DashboardLayout from "~/layouts/DashboardLayout";
import { getMajorsByUniversity, updateProfile } from "~/utils/api";

export const getServerSideProps = withSession({
  force: true,
  handler: async (ctx, session) => {
    const universities = await db.university.findMany({
      select: { id: true, name: true },
    });
    return { props: { data: universities } };
  },
});

type FormData = {
  name: string;
  majorType: "SAINTEK" | "SOSHUM";
  university1: number;
  major1: number;
  university2: number;
  major2: number;
};

interface MajorSelect {
  id: number;
  name: string;
}

const majorTypeOptions = [
  { name: "SOSHUM", value: "SOSHUM" },
  { name: "SAINTEK", value: "SAINTEK" },
];

const ProfileSettings = () => {
  const { user } = useMe({ optimist: true });
  const { watch, register, setValue, getValues, handleSubmit } =
    useForm<FormData>({
      defaultValues: {
        name: user.name,
        university1: user.major1?.university.id,
        major1: user.major1?.id,
        university2: user.major2?.university.id,
        major2: user.major2?.id,
        majorType: user.majorType,
      },
    });
  const university1 = watch("university1");
  const university2 = watch("university2");
  const majorType = watch("majorType");
  const [majors1, setMajors1] = useState<MajorSelect[]>([]);
  const [majors2, setMajors2] = useState<MajorSelect[]>([]);
  useEffect(() => {
    if (university1)
      getMajorsByUniversity(university1, majorType).then(setMajors1);
  }, [university1, majorType]);
  useEffect(() => {
    if (university2)
      getMajorsByUniversity(university2, majorType).then(setMajors2);
  }, [university2, majorType]);
  const universities = usePageData<MajorSelect[]>();
  const options = useMemo(
    () => universities.map((u) => ({ name: u.name, value: u.id })),
    [universities]
  );
  const majors1Options = useMemo(
    () => majors1.map((m) => ({ name: m.name, value: m.id })),
    [majors1]
  );
  const majors2Options = useMemo(
    () => majors2.map((m) => ({ name: m.name, value: m.id })),
    [majors2]
  );
  const onSubmit = handleSubmit((data) => {
    const promise = updateProfile({
      name: data.name,
      major1: data.major1,
      major2: data.major2,
      majorType: data.majorType,
    });
    toast.promise(promise, {
      success: "Profile updated",
      error: "Error updating profile",
      pending: "Updating profile...",
    });
  });

  return (
    <form className="max-w-screen-md mx-auto w-full" onSubmit={onSubmit}>
      <TextInput
        type="text"
        {...register("name", { required: true })}
        placeholder="Name"
        label="Name"
      />
      <label>Jurusan</label>
      <SelectSearch
        options={majorTypeOptions}
        value={majorType}
        onChange={(value) => setValue("majorType", value as any)}
      />
      <label>Pilihan Univ 1</label>
      <SelectSearch
        options={options}
        value={university1 as any}
        search
        onChange={(value) => setValue("university1", value as any)}
      />
      <SelectSearch
        options={majors1Options}
        search
        value={getValues("major1") as any}
        onChange={(value) => setValue("major1", value as any)}
      />
      <label>Pilihan Univ 2</label>
      <SelectSearch
        options={options}
        value={university2 as any}
        search
        onChange={(value) => setValue("university2", value as any)}
      />
      <SelectSearch
        options={majors2Options}
        search
        value={getValues("major2") as any}
        onChange={(value) => setValue("major2", value as any)}
      />
      <button className="w-40 px-2 py-1.5 bg-green-400 text-white font-medium rounded-md text-center block mx-auto mt-2">
        SAVE
      </button>
    </form>
  );
};

ProfileSettings.Layout = DashboardLayout;

export default ProfileSettings;
