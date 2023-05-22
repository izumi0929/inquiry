type Address = {
  address1: string
  address2: string
  address3: string
  kana1: string
  kana2: string
  kana3: string
  prefcode: string
  zipcode: string
}

export const searchAddressByPostalcode = async (
  postalcode: string
): Promise<Address> => {
  try {
    const res = await fetch(
      `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${postalcode}`
    )
    const data = await res.json()
    if (data.results === null) {
      throw new Error()
    }
    return data.results[0]
  } catch (err) {
    throw new Error("郵便番号から住所を検索できませんでした")
  }
}
