"use client";

import { Member } from "@/types";
import MemberCard from "./MemberCard";

type Props = {
  members: Member[];
  isSpecialRole: boolean;
  onMemberClick: (member: Member) => void;
};

export default function MemberGrid({
  members,
  isSpecialRole,
  onMemberClick,
}: Props) {
  if (isSpecialRole) {
    return (
      <div className="flex justify-center">
        {members.map((member) => (
          <div 
            key={member.id} 
            className="transform hover:-translate-y-2 transition-transform duration-300 w-full sm:max-w-2xl mx-auto"
          >
            <MemberCard 
              member={member} 
              onClick={() => onMemberClick(member)}
              variant="wide"
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
      {members.map((member) => (
        <div 
          key={member.id} 
          className="transform hover:-translate-y-2 transition-transform duration-300 w-full"
        >
          <MemberCard 
            member={member} 
            onClick={() => onMemberClick(member)}
            variant="standard"
          />
        </div>
      ))}
    </div>
  );
}
