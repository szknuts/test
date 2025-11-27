import fs from "fs";
import path from "path";
import { Member } from "@/types";
import { parseCSV } from "@/lib/utils/csv";

const DATA_DIR = path.join(process.cwd(), "data");

async function readCSV(filename: string): Promise<Record<string, string>[]> {
  const filePath = path.join(DATA_DIR, filename);
  try {
    const content = await fs.promises.readFile(filePath, "utf-8");
    return parseCSV(content);
  } catch (error) {
    console.error(`Failed to read CSV file: ${filename}`, error);
    return [];
  }
}

function mapClassification(val: string): string {
  if (val === "0") return "マネージャー";
  if (["1", "2", "3", "4"].includes(val)) return `${val}回生`;
  return val; // "コーチ", "監督" etc.
}

export async function fetchMembers(): Promise<Member[]> {
  const rows = await readCSV("members.csv");
  return rows.map((row, idx) => ({
    id: `member_${idx}`,
    name: row.name,
    classification: mapClassification(row.classification),
    position: row.position,
    weight: row.weight,
    faculty: row.faculty,
    history: row.history,
    image: `/images/members/${row.name}.png`,
    bio: row.history, // Use history as bio for now
  }));
}

export async function fetchCoaches(): Promise<Member[]> {
  const rows = await readCSV("coaches.csv");
  return rows.map((row, idx) => ({
    id: `coach_${idx}`,
    name: row.name,
    classification: "コーチ",
    position: "コーチ", // Default position
    history: row.history,
    image: `/images/coaches/${row.name}.png`,
    bio: row.history,
  }));
}

export async function fetchExecutives(): Promise<Member[]> {
  const rows = await readCSV("special/executives.csv");
  return rows.map((row, idx) => ({
    id: `exec_${idx}`,
    name: row.name,
    classification: row.classification, // "監督", "総監督" etc.
    position: row.position,
    weight: row.weight,
    faculty: row.faculty,
    history: row.history,
    image: `/images/special/${row.name}.png`,
    bio: row.history,
  }));
}

export async function fetchAllMembers(): Promise<Member[]> {
  const [members, coaches, executives] = await Promise.all([
    fetchMembers(),
    fetchCoaches(),
    fetchExecutives(),
  ]);
  return [...executives, ...coaches, ...members];
}
