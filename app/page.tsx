import Link from "next/link";

import { fetchMembers, fetchCoaches, fetchExecutives } from "@/lib/members/fetchMembers";
import {
  groupByClassification,
  orderKeys,
  memberClassificationOrder,
  staffClassificationOrder,
  memberClassificationDisplay,
  staffClassificationDisplay,
} from "@/lib/members/grouping";
import MemberSection from "@/components/members/MemberSection";
import HeroSection from "@/components/home/HeroSection";
import ClubIntro from "@/components/home/ClubIntro";
import ActivitySection from "@/components/home/ActivitySection";
import RecruitmentCTA from "@/components/home/RecruitmentCTA";
import InstagramSection from "@/components/home/InstagramSection";

export default async function Home() {
  // ローカルCSVから部員データとスタッフデータを取得
  const members = await fetchMembers();
  const coaches = await fetchCoaches();
  const executives = await fetchExecutives();
  
  const staff = [...executives, ...coaches];

  const membersByClassification = groupByClassification(members);
  const staffByClassification = groupByClassification(staff);

  const memberGroupKeys = orderKeys(
    membersByClassification,
    memberClassificationOrder
  );
  const staffGroupKeys = orderKeys(
    staffByClassification,
    staffClassificationOrder
  );

  return (
    <div className="bg-white">
      {/* ヒーローセクション */}
      <HeroSection />

      {/* クラブ紹介セクション */}
      <ClubIntro />

      {/* 活動内容セクション */}
      <ActivitySection />

      {/* 部員紹介セクション */}
      <MemberSection
        sectionId="members"
        title="MEMBERS"
        subtitle="ともにトレーニングに励む仲間たち"
        groups={membersByClassification}
        groupKeys={memberGroupKeys}
        displayNames={memberClassificationDisplay}
        bgColor="bg-white"
      />

      {/* スタッフ紹介セクション */}
      <MemberSection
        sectionId="staff"
        title="STAFF"
        subtitle="チームを支えるスタッフ"
        groups={staffByClassification}
        groupKeys={staffGroupKeys}
        displayNames={staffClassificationDisplay}
        bgColor="bg-gray-50"
      />

      {/* 入部募集CTA */}
      <RecruitmentCTA />

      {/* Instagram/SNSセクション */}
      <InstagramSection />
    </div>
  );
}
