/**
 * トップページコンポーネント
 */
import Link from "next/link";


import MemberSection from "@/components/sections/MemberSection";
import StaffSection from "@/components/sections/StaffSection";
import HeroSection from "@/components/sections/HeroSection";
import ClubIntro from "@/components/sections/ClubIntro";
import ActivitySection from "@/components/sections/ActivitySection";
import RecruitmentCTA from "@/components/sections/RecruitmentCTA";
import InstagramSection from "@/components/sections/InstagramSection";

import MessageSection from "@/components/sections/MessageSection";

export default async function Home() {
  return (
    <div className="bg-white">
      {/* ヒーローセクション */}
      <HeroSection />

      {/* クラブ紹介セクション */}
      <ClubIntro />

      {/* メッセージセクション */}
      <MessageSection />

      {/* 活動内容セクション */}
      <ActivitySection />

      {/* 部員紹介セクション */}
      <MemberSection
        bgColor="bg-white"
      />

      {/* スタッフ紹介セクション */}
      <StaffSection
        bgColor="bg-gray-50"
      />

      {/* 入部募集CTAセクション */}
      <RecruitmentCTA />

      {/* Instagramセクション */}
      <InstagramSection />
    </div>
  );
}
