import { minecraftRequest, skinRequest, request, mcServerRequest } from '@/utils'

export default {
    get_uuid: USERNAME => minecraftRequest.get(`/users/profiles/minecraft/${USERNAME}`),
    get_skin: UUID => skinRequest.get(`/session/minecraft/profile/${UUID}`),
    get_nbtZip: () => request({
        method: 'get',
        baseURL: 'api/file/getPlayerNbt',
        responseType: 'blob'
    }),
    get_onlinePlayerInfo: () => mcServerRequest.get('getOnlinePlayerInfo')
}