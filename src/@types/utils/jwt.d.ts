import { JwtPayload } from "jsonwebtoken";
export declare function signToken(payload: any): string;
interface UserInfo extends JwtPayload {
    _id: string;
    username: string;
}
export declare function verifyToken(token: string): UserInfo;
declare const _default: {
    signToken: typeof signToken;
    verifyToken: typeof verifyToken;
};
export default _default;
