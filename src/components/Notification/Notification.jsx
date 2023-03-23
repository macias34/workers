import { hideNotification } from "@/src/features/notification/notificationSlice";
import { useEffect, useState } from "react";
import { BsExclamationTriangleFill } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const Notification = () => {
  const dispatch = useDispatch();
  const { show, type, message } = useSelector((state) => state.notification);

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        dispatch(hideNotification());
      }, 2000);
    }
  }, [show]);

  const getColorsByType = (type) => {
    switch (type) {
      case "error":
        return "border-red-300 text-red-400 border-red-800";

      case "success": {
        return "border-emerald-300 text-emerald-400 border-emerald-800";
      }
      default:
        break;
    }
  };

  const getIconByType = (type) => {
    switch (type) {
      case "error":
        return <BsExclamationTriangleFill />;

      case "success": {
        return <FaCheck />;
      }
      default:
        break;
    }
  };

  return (
    <div
      className={`flex items-center absolute top-8 right-8 w-fit transition p-4 mb-4 text-sm border rounded-lg bg-gray-800  ${getColorsByType(
        type
      )} ${show ? "opacity-100" : "opacity-0"}`}
    >
      {getIconByType(type)}
      <span className="pl-3">{message}</span>
    </div>
  );
};

export default Notification;
