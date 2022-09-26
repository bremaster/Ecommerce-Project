import { useState } from 'react'

/**
 * フォーム情報の管理用フック
 */
export function useForm<T extends string>(
  keynames: Readonly<Array<T>>
): [{ [key in T]: string | undefined }, (key: T, value: string | undefined) => void] {
  const initialForm: { [key in T]: string | undefined } = keynames.reduce(
    (form, keyname) => ({ ...form, [keyname]: undefined }),
    {} as { [key in T]: string | undefined }
  )
  const [form, setForm] = useState(initialForm)

  const sendFormValue = (key: T, value: string | undefined) => {
    // use update function pattern
    // because normal setState call is batched and the last wins
    setForm((prevForm) => ({ ...prevForm, [key]: value }))
  }

  return [form, sendFormValue]
}
