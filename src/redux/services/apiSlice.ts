// sử dụng redux toolkit và async-mutex để quản lý việc gọi api với cơ chế làm mới token tự động khi gặp lỗi xác thực 401
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query"; // hàm tiện ích để thực hiện các yêu cầu http cơ bản
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query"; // định nghĩa các query cơ bản
import { setAuth, logout } from "../feartures/authSlice"; // các actions cập nhật trạng thái xác thực
import { Mutex } from "async-mutex"; // sử dụng để tránh các yêu cầu làm mới token trùng lặp

// tạo mới 1 mutex
const mutex = new Mutex();

// fetchBaseQuery với cấu hình baseUrl và credentials để bao gồm cookie trong mỗi yêu cầu.
const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_HOST}/api`,
  credentials: "include",
});

// Hàm này sẽ kiểm tra xem yêu cầu API có bị lỗi xác thực (401 Unauthorized) hay không.
// Nếu gặp lỗi 401, nó sẽ cố gắng làm mới token và thực hiện lại yêu cầu.
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // Đợi khi mutex không bị khóa:
  await mutex.waitForUnlock();

  //   gọi baseQuery lấy kết quả
  let result = await baseQuery(args, api, extraOptions);

  //   nếu kết quả trả về 401
  if (result.error && result.error.status === 401) {
    // Kiểm tra nếu mutex không bị khóa và khóa nó để tránh các yêu cầu làm mới token trùng lặp
    // Kiểm tra xem mutex có bị khóa hay không:
    if (!mutex.isLocked()) {
      // Hàm này kiểm tra xem mutex có đang bị khóa hay không. Nếu không bị khóa (false), nó sẽ tiếp tục thực hiện các bước tiếp theo để làm mới token.
      const release = await mutex.acquire(); //Hàm này khóa mutex để đảm bảo rằng không có yêu cầu làm mới token nào khác được thực hiện đồng thời. Nó trả về một hàm release để mở khóa sau khi hoàn thành.
      try {
        // thực hiện yêu cầu làm mới token
        const refreshResult = await baseQuery(
          { url: "/jwt/refresh/", method: "POST" },
          api,
          extraOptions
        );
        if (refreshResult.data) {
          // Nếu kết quả làm mới token thành công
          api.dispatch(setAuth()); // nó sẽ dispatch( gửi đi ) action setAuth để cập nhật trạng thái xác thực với token mới
          result = await baseQuery(args, api, extraOptions); // thực hiện lại yêu cầu ban đầu với token mới
        } else {
          api.dispatch(logout()); // nếu làm mới token thất bại(refreshResult.data == null || underfine) nó sẽ dispatch action logout để đăng xuất người dùng
        }
      } finally {
        release(); //Đảm bảo mutex luôn được mở khóa sau khi hoàn thành việc làm mới token, bất kể yêu cầu làm mới có thành công hay không.
      }
    }
    // Nếu mutex đang bị khóa, đợi cho đến khi nó được mở khóa và thực hiện lại yêu cầu:
    else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({})
})