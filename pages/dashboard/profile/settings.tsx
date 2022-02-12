import React, { useEffect, useMemo, useState } from "react";
import SelectSearch, { fuzzySearch } from "react-select-search";
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
  const [state, setState] = useState({
    name: user.name || "",
    majorType: user.majorType,
    university1: user.major1?.university.id,
    major1: user.major1?.id,
    university2: user.major2?.university.id,
    major2: user.major2?.id,
  });

  const { major1, major2, majorType, name, university1, university2 } = state;
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
  const onSubmit = (e: any) => {
    e.preventDefault();
    const promise = updateProfile({
      name: name,
      major1: major1,
      major2: major2,
      majorType: majorType,
    });
    toast
      .promise(promise, {
        success: "Profile updated",
        error: "Error updating profile",
        pending: "Updating profile...",
      })
      .then(() => window.location.reload());
  };

  return (
    <form className="max-w-screen-md mx-auto w-full px-4" onSubmit={onSubmit}>
      <TextInput
        type="text"
        placeholder="Name"
        label="Name"
        value={name}
        onChange={(e) => setState({ ...state, name: e.target.value })}
      />
      <label>Jurusan</label>
      <SelectSearch
        options={majorTypeOptions}
        value={majorType}
        onChange={(value) => setState({ ...state, majorType: value as any })}
        filterOptions={fuzzySearch}
      />
      <label className="mt-2 block">Pilihan Univ 1</label>
      <SelectSearch
        options={options}
        value={university1 as any}
        search
        onChange={(value) => setState({ ...state, university1: value as any })}
        filterOptions={fuzzySearch}
      />
      <SelectSearch
        options={majors1Options}
        search
        value={major1 as any}
        onChange={(value) => setState({ ...state, major1: value as any })}
        filterOptions={fuzzySearch}
      />
      <label className="mt-2 block">Pilihan Univ 2</label>
      <SelectSearch
        options={options}
        value={university2 as any}
        search
        onChange={(value) => setState({ ...state, university2: value as any })}
        filterOptions={fuzzySearch}
      />
      <SelectSearch
        options={majors2Options}
        search
        value={major2 as any}
        onChange={(value) => setState({ ...state, major2: value as any })}
        filterOptions={fuzzySearch}
      />
      <button className="w-40 px-2 py-1.5 bg-green-400 text-white font-medium rounded-md text-center block mx-auto mt-2">
        SAVE
      </button>
    </form>
  );
};

ProfileSettings.Layout = DashboardLayout;

export default ProfileSettings;
