import { fetchCoaches, fetchExecutives } from "@/lib/data/fetchMembers";
import {
  groupByClassification,
  orderKeys,
  staffClassificationOrder,
  staffClassificationDisplay,
} from "@/lib/data/grouping";
import StaffSectionClient from "./StaffSectionClient";

type Props = {
  bgColor?: string;
  sectionId?: string;
};

export default async function StaffSection({
  bgColor = "bg-gray-50",
  sectionId,
}: Props) {
  const coaches = await fetchCoaches();
  const executives = await fetchExecutives();
  const staff = [...executives, ...coaches];

  const staffByClassification = groupByClassification(staff);
  const staffGroupKeys = orderKeys(
    staffByClassification,
    staffClassificationOrder
  );

  return (
    <StaffSectionClient
      groups={staffByClassification}
      groupKeys={staffGroupKeys}
      displayNames={staffClassificationDisplay}
      bgColor={bgColor}
      sectionId={sectionId}
    />
  );
}
