import React from "react";
import "./Regulation.scss";

const Regulation = () => {
  return (
    <div className="regulation">
      <div className="regulation_header">
        QUY ĐỊNH ĐỔI, TRẢ VÉ TẾT ẤT TỴ 2025
      </div>
      <div className="regulation_wrap">
        <ul className="regulation_list">
          <li className="regulation_item">
            1. Thời gian cao điểm Tết: Mức khấu trừ đối với vé trả lại, đổi vé
            là 30% giá tiền in trên Thẻ lên tàu hỏa (vé).
          </li>
          <li className="regulation_item">
            - Từ ngày 21/01/2025 đến ngày 31/01/2025: đối với đoàn tàu số chẵn.
          </li>
          <li className="regulation_item">
            - Từ ngày 01/02/2025 đến ngày 09/02/2025: đối với đoàn tàu số lẻ.
          </li>
          <li className="regulation_item">
            - Từ ngày 23/01/2025 đến ngày 27/01/2025: đối với đoàn tàu số lẻ có
            ga đi là ga Hà Nội và có ga đến từ ga Phủ Lý đến ga Đồng Hới.
          </li>
          <li className="regulation_item">
            - Từ ngày 31/01/2025 đến ngày 09/02/2025: đối với đoàn tàu số chẵn
            có ga đi từ ga Đồng Hới đến ga Phủ Lý và có ga đến là ga Hà Nội.
          </li>
          <li className="regulation_item">(*) Thời gian đổi, trả vé</li>
          <li className="regulation_item">
            - Hành khách đổi, trả vé cá nhân: chậm nhất trước giờ tàu chạy là 24
            giờ.
          </li>
          <li className="regulation_item">
            - Hành khách trả vé tập thể: chậm nhất trước giờ tàu chạy là 48 giờ.
          </li>
        </ul>
        <ul className="regulation_list">
          <li className="regulation_item">
            2. Ngoài thời gian quy định tại điểm (1.) nêu trên, mức khấu trừ
            phí, thời gian đổi, trả vé thực hiện như sau:
          </li>
          <li className="regulation_item">
            - Đổi vé: Vé cá nhân đổi trước giờ tàu chạy 24 giờ trở lên, lệ phí
            là 20.000 đồng/vé; không áp dụng đổi vé đối với vé tập thể.
          </li>
          <li className="regulation_item">
            <p>- Trả vé:</p>
            <div className="regulation_item-item">
              <p>
                {" "}
                + Vé cá nhân: Trả vé trước giờ tàu chạy từ 4 giờ đến dưới 24
                giờ, lệ phí là 20% giá vé; từ 24 giờ trở lên lệ phí là 10% giá
                vé.
              </p>
              <p>
                + Vé tập thể: Trả vé trước giờ tàu chạy từ 24 giờ đến dưới 72
                giờ, lệ phí là 20% giá vé; từ 72 giờ trở lên lệ phí là 10% giá
                vé.
              </p>
            </div>
          </li>
        </ul>
        <ul className="regulation_list">
          <li className="regulation_item">3. Hình thức trả vé.</li>
          <li className="regulation_item">
            - Khi hành khách mua vé và thanh toán online qua website bán vé của
            Ngành Đường sắt, app bán vé hoặc các ứng dụng mua vé tàu hỏa của các
            đối tác thứ ba thì có thể trả vé online qua các website bán vé của
            Ngành Đường sắt hoặc đến trực tiếp nhà ga.
          </li>
          <li className="regulation_item">
            - Khi hành khách mua vé bằng các hình thức khác, muốn đổi vé, trả vé
            hành khách đến trực tiếp nhà ga kèm theo giấy tờ tùy thân bản chính
            của người đi tàu (hoặc người mua vé) cho nhân viên đường sắt. Đồng
            thời, thông tin trên thẻ đi tàu phải trùng khớp với giấy tờ tùy thân
            của hành khách.
          </li>
          <li className="regulation_item">Trân trọng cảm ơn!.</li>
        </ul>
      </div>
    </div>
  );
};

export default Regulation;
