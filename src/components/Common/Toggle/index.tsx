import React, { useMemo, useEffect, useCallback } from "react";
import { putNotification } from "@services/settings";
import useNotificationStore from "@store/useNotificationStore";

function Toggle() {
  const { isChecked, setIsChecked } = useNotificationStore();

  useEffect(() => {
    checkNotification();
  }, [isChecked]);

  const checkNotification = useCallback(async () => {
    let flag;
    if (isChecked) {
      flag = "Y";
      ``;
    } else {
      flag = "N";
    }
    try {
      const res = await putNotification(flag);
    } catch (err) {
      console.log("알림 에러", err);
    }
  }, [isChecked]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" value="" className="sr-only peer" checked={isChecked} onChange={onChange} />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
    </label>
  );
}

export default Toggle;
