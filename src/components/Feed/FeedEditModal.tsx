"use client";
import { useState } from "react";
// import { updateFeed } from "@/src/services/apiFeed";
import { updateFeed } from "@/src/services/feed";
import { useToast } from "@/components/ui/use-toast";
import CustomModal from "@/src/components/Common/Dialog/CustomModal";
import useSignUpStore from "@/src/store/useSignUpStore";
import useFeedStore from "@/src/store/useFeedStore";
import { FeedEditModalProps } from "@/src/types/feed";

function FeedEditModal({ reload, setReload }: FeedEditModalProps) {
  const feed = useFeedStore((state) => state.feed);
  const [content, setContent] = useState(feed.content);
  const setNextComponent = useSignUpStore((state) => state.setNextComponent);

  const { toast } = useToast();

  const changeTextAreaHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const clickCloseBtnHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setNextComponent("");
  };

  const clickEditBtnHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      await updateFeed(feed.id, content);
      setNextComponent("");
      setReload(!reload);
      toast({ description: "게시글 수정되었습니다!" });
    } catch (err) {
      toast({ description: "게시글 수정에 오류 발생하였습니다!" });
    }
  };

  return (
    <CustomModal>
      <div className="flex items-start justify-between p-4">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">피드 수정</h4>
      </div>
      <form className="mx-5">
        <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700">
          <div className=" px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              onChange={changeTextAreaHandler}
              value={content}
              id="comment"
              className="w-full px-0 text-sm resize-none text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
              placeholder="내용을 입력해 주세요!"
              required
            ></textarea>
          </div>
        </div>
      </form>

      <div className="flex items-center p-6 rounded-b gap-3">
        <button
          onClick={clickCloseBtnHandler}
          data-modal-hide="defaultModal"
          type="button"
          className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
        >
          취소
        </button>
        <button
          onClick={clickEditBtnHandler}
          data-modal-hide="defaultModal"
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          수정
        </button>
      </div>
    </CustomModal>
  );
}

export default FeedEditModal;
