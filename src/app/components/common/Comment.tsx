import React from "react";
import Image from "next/image";
import Link from "next/link";

const Comment = () => {
  const commentsData = [
    {
      id: 1,
      avatar: "/images/avt01.png",
      username: "심심한돼지",
      comment: "네 저도 같은 의견입니다. 그런데 사람이라는 게 모두 다 똑같을..",
      topic: "AppRoute에 대해서",
    },
    {
      id: 2,
      avatar: "/images/avt02.png",
      username: "피곤한용",
      comment: "정말 유용합니다. 감사합니다.",
      topic: "Map vs FlatMap",
    },
    {
      id: 3,
      avatar: "/images/avt03.png",
      username: "사랑스러운유니콘",
      comment: "안 될 것 같은데요..",
      topic: "개발자는 AI에게 대체될 것인가",
    },
    {
      id: 4,
      avatar: "/images/avt04.png",
      username: "신나는고양이",
      comment: "하하 참..",
      topic: "아무리 그렇다고 하지만..",
    },
  ];
  return (
    <>
      <h2 className="font-bold text-sm text-black">Comments</h2>
      <ul className="flex flex-col w-[179px] items-start gap-[25px]">
        {commentsData.map((item) => (
          <li key={item.id} className="w-full">
            <Link
              href="#"
              className="flex flex-col items-start gap-1 w-full"
              aria-label={`View discussion about ${item.topic}`}
            >
              <div className="inline-flex items-center gap-2">
                <Image
                  src={item.avatar}
                  alt={`${item.username} avatar`}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span className="text-xs font-bold text-[#878787]">
                  {item.username}
                </span>
              </div>
              <p className="text-xs font-bold text-[#5e5e5e] leading-4">
                {item.comment}
              </p>
              <div className="flex items-center justify-between w-full">
                <span className="text-xs text-[#a1a1a1]">{item.topic}</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M5 3L9 7L5 11"
                    stroke="#a1a1a1"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Comment;
