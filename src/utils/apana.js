

// ERC 721 표준
// {
//     "title": "Asset Metadata",
//     "type": "object",
//     "properties": {
//         "name": {
//             "type": "string",
//             "description": "Identifies the asset to which this NFT represents"
//         },
//         "description": {
//             "type": "string",
//             "description": "Describes the asset to which this NFT represents"
//         },
//         "image": {
//             "type": "string",
//             "description": "A URI pointing to a resource with mime type image/* representing the asset to which this NFT represents. Consider making any images at a width between 320 and 1080 pixels and aspect ratio between 1.91:1 and 4:5 inclusive."
//         }
//     }
// }

//게임당 스마트 컨트랙트 하나

// 링크와 디링크 가능 , 게임과 스마트컨트랙트의 , 개발자 마음이지 , 신뢰이고


// 이게 문제 , github 같은 사이트에서 작성하게 할지 , 아니면 이렇게 게임 코드에 넣을지 
export function WriteContract(){

}

// 예시
const item = {
    "name": "The Ring",
    "description": "The One Ring to rule them all, The One Ring to find them, The One Ring to bring them all and in the darkness bind them",
    "image": "http",
    "glb": "url",
    // 마음대로 확장가능한 커스텀 프로퍼티
    "properties": {
        "name": {
            "type": "string",
            "description": "Identifies the asset to which this NFT represents"
        },
        "description": {
            "type": "string",
            "description": "Describes the asset to which this NFT represents"
        },
        "image": {
            "type": "string",
            "description": "A URI pointing to a resource with mime type image/* representing the asset to which this NFT represents. Consider making any images at a width between 320 and 1080 pixels and aspect ratio between 1.91:1 and 4:5 inclusive."
        }
    }
}

// 필드 내 수집형 , nft 아이템과
// 개발자가 등록한 nft 아이템

// 일단 한번 호출하고 , 주석처리하라 그럴까?????

export function itemToNFT(item) {
    // 이더리움 api 등등 써서 자동으로 nft로 만들어주는 함수

    // 로컬에도 저장하고, 체인에도 저장


}

// 게임 처음 시작했을때, 내가 가지고 있는 nft 아이템들의 진위여부 스마트컨트랙트로 판별
export function LoadItems(address) {
    // Load items from address
    const items = ["fetched"]

    // ABI 로 스마트컨트랙트의 함수 호출


    return items
}

// 게이머가 새로 플레이어 캐릭터 생성할때마다 , 지갑도 같이 생성
export function CreatePlayer() {

    // 아바타 하나당 지갑 하나 생성

    // 계정당 하나일지 , 아바타당 하나일지 , 개발자 자유


}