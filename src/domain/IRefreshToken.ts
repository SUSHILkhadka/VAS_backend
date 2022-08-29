interface IRefreshToken{
    id?:number,
    refreshToken: string,
    userId: number,
    expiresAt: number,
}

export default IRefreshToken;