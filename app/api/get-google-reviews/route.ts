import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const reviews = [
    {
      _id: "1",
      name: "PAVAN PRAKASH",
      rating: 5,
      text: "Excellent place for kids to improve English communication and confidence. Friendly teachers and great learning atmosphere!",
      avatarUrl:
        "https://ui-avatars.com/api/?name=PAVAN+PRAKASH&background=4F46E5&color=fff",
      createdAt: "6 reviews",
    },
    {
      _id: "2",
      name: "Subramanya A",
      rating: 5,
      text: "Great learning center for kids. Teacher is very patient and makes learning fun. Kids can understand easily and feel happy while learning.",
      avatarUrl:
        "https://ui-avatars.com/api/?name=Subramanya+A&background=10B981&color=fff",
      createdAt: "a day ago",
    },
    {
      _id: "3",
      name: "Kavya Nanjareddy",
      rating: 5,
      text: "Very good place to learn. Trainer is highly knowledgeable, patient, and supportive, making it easy to understand even complex topics. I had a great experience here and would definitely recommend it to others.",
      avatarUrl:
        "https://ui-avatars.com/api/?name=Kavya+Nanjareddy&background=EC4899&color=fff",
      createdAt: "a day ago",
    },
    {
      _id: "4",
      name: "Praveen Pravi",
      rating: 5,
      text: "Good teaching ❤️",
      avatarUrl:
        "https://ui-avatars.com/api/?name=Praveen+Pravi&background=F59E0B&color=fff",
      createdAt: "2 days ago",
    },
    {
      _id: "5",
      name: "Nagu Nagamani",
      rating: 5,
      text: "Good place for gaining English proficiency ❤️",
      avatarUrl:
        "https://ui-avatars.com/api/?name=Nagu+Nagamani&background=3B82F6&color=fff",
      createdAt: "2 days ago",
    },
    {
      _id: "6",
      name: "Manjunath Sampath",
      rating: 5,
      text: "Great place for kids tutions, very knowledgeable teacher and staff...",
      avatarUrl:
        "https://ui-avatars.com/api/?name=Manjunath+Sampath&background=8B5CF6&color=fff",
      createdAt: "6 days ago",
    },
    {
      _id: "7",
      name: "Nageshkumar gn Nagesh",
      rating: 5,
      text: "Best place to learn spoken English. Teacher has good expertise in teaching. ❤️",
      avatarUrl:
        "https://ui-avatars.com/api/?name=Nageshkumar+Nagesh&background=14B8A6&color=fff",
      createdAt: "6 days ago",
    },
    {
      _id: "8",
      name: "Sudhakar C R",
      rating: 5,
      text: "Child friendly, hygienic set-up with easy access and unique teaching methods. Learning spoken English at younger age adds more value addition. ❤️",
      avatarUrl:
        "https://ui-avatars.com/api/?name=Sudhakar+C+R&background=EF4444&color=fff",
      createdAt: "a week ago",
    },
    {
      _id: "9",
      name: "Arun Kumar G",
      rating: 5,
      text: "Excellent learning atmosphere and supportive teaching methods for children.",
      avatarUrl:
        "https://ui-avatars.com/api/?name=Arun+Kumar+G&background=6366F1&color=fff",
      createdAt: "6 days ago",
    },
  ];

  return NextResponse.json({
    success: true,
    reviews,
  });
}
