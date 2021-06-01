import React from "react";
import TaiLieuCard from "./TaiLieu";
import TaiLieuPendingCard from "./TaiLieuPending";

function DanhSachTaiLieu(props) {
  const {
    tailieu,
    tailieuPending,
    accessRights,
    userlogin,
    handleDeleteTaiLieu,
  } = props;
  return (
    <div>
      <TaiLieuCard
        tailieu={tailieu}
        userlogin={userlogin}
        accessRights={accessRights}
        handleDeleteTaiLieu={handleDeleteTaiLieu}
      />

      <TaiLieuPendingCard
        tailieuPending={tailieuPending}
        userlogin={userlogin}
        accessRights={accessRights}
      />
    </div>
  );
}

export default DanhSachTaiLieu;
