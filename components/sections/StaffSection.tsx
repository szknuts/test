/**
 * スタッフ紹介セクション
 * グループ化されたスタッフ情報をセクションごとに表示する。
 */
"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import type { Member } from "@/types";
import MemberGrid from "../members/MemberGrid";
import MemberModal from "../members/MemberModal";
import SectionHeading from "../ui/SectionHeading";
import { COACHES_DATA } from "@/lib/data/coaches";
import { EXECUTIVES_DATA } from "@/lib/data/executives";
import {
  groupByClassification,
  orderKeys,
  staffClassificationOrder,
  staffClassificationDisplay,
} from "@/lib/data/grouping";

type Props = {
  bgColor?: string;
  sectionId?: string;
};

export default function StaffSection({
  bgColor = "bg-gray-50",
  sectionId,
}: Props) {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const staff = [...EXECUTIVES_DATA, ...COACHES_DATA];
  const groups = groupByClassification(staff);
  const groupKeys = orderKeys(groups, staffClassificationOrder);

  return (
    <section id={sectionId} className={`py-24 px-4 ${bgColor} relative overflow-hidden`}>
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading title="STAFF" subtitle="チームを支えるスタッフ" bg="light" />

        {groupKeys.map((classification) => {
          const members = groups[classification];
          const isSpecialRole = ["部長", "総監督", "監督"].includes(classification);

          return (
            <div key={classification} className="mb-24">
              <div className="max-w-5xl mx-auto mb-12">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-12 bg-red-600 transform -skew-x-12" />
                  <h3 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter">
                    {staffClassificationDisplay[classification] ?? classification}
                  </h3>
                </div>
              </div>
              
              <MemberGrid
                members={members}
                isSpecialRole={isSpecialRole}
                onMemberClick={setSelectedMember}
              />
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedMember && (
          <MemberModal
            member={selectedMember}
            onClose={() => setSelectedMember(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

