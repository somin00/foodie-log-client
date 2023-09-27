import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useRouter } from "next/navigation";
import useSignUpStore from "@/src/store/useSignUpStore";
import DialogReport from "../../Dialog/DialogReport";
import DialogConfirm from "../../Dialog/DialogConfirm";
import { deleteFeed } from "@/src/services/apiFeed";
import { useToast } from "@/components/ui/use-toast";
import useFeedStore from "@/src/store/useFeedStore";

interface MenuProps {
  name: string;
  option: string;
  id?: number;
  type?: string;
  content?: string;
  removeDeletedFeed?: (feedId: number) => void;
}

function DropDown({ name, option, id = 0, type = "", content = "", removeDeletedFeed }: MenuProps) {
  const setNextComponent = useSignUpStore((state) => state.setNextComponent);
  const router = useRouter();
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const setFeed = useFeedStore((state) => state.setFeed);

  const { toast } = useToast();

  let items: string[];
  let onClickHandler: React.MouseEventHandler<HTMLDivElement> | undefined;

  switch (option) {
    case "설정 및 개인정보":
      items = ["설정 및 개인정보"];
      onClickHandler = () => {
        router.push("/main/settings");
        return;
      };
      break;
    case "타인":
      items = ["신고"];
      onClickHandler = () => {
        setShowReportDialog(true);
      };
      break;
    case "본인댓글":
      items = [];
      break;
    case "본인":
      items = ["수정", "삭제"];
      break;
    default:
      items = [];
  }

  const onClickEdit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setNextComponent("EditModal");
    setFeed({ id, content });
  };

  const onClickDelete = async () => {
    setShowConfirmDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await deleteFeed(id); // API 호출
      console.log("response", response);
      if (response.status === 200) {
        toast({ description: "피드가 정상 삭제 되었습니다👍!" });
        if (removeDeletedFeed) removeDeletedFeed(id);
      } else {
        alert(response.error.message); // API에서 반환된 에러 메시지를 알림으로 표시
      }
      setShowConfirmDialog(false);
    } catch (error) {
      toast({ description: "게시글 삭제 중 에러가 발생했습니다. 다시 시도해주세요!🙄" });
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <BsThreeDotsVertical size="1rem" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="absoluteright-3 bg-white">
          <DropdownMenuLabel>{name}</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-gray-100" />
          {items?.map((item, i) => (
            <DropdownMenuItem
              key={i}
              onClick={onClickHandler ? onClickHandler : i === 0 ? onClickEdit : onClickDelete}
              className="cursor-pointer"
            >
              {item}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogReport
        id={id}
        name={name}
        type={type}
        isOpened={showReportDialog}
        onClose={() => setShowReportDialog(false)}
      />
      <DialogConfirm
        isOpened={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={handleConfirmDelete}
        content="게시글을 정말로 삭제하시겠습니까?"
      />
    </>
  );
}

export default DropDown;
