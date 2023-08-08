import { generateFileNameByDate } from '@gitart/shared/utils'

import { useAppStore } from '@/stores/app.store'

import { i18n } from '@/locales/i18n'

export const generateFileName = (name: string, type?: string) => `${generateFileNameByDate()}_${name}${type ? `.${type}` : ''}`

export const generateDownloadTextHref = (text: string) => {
  return `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`
}

export const validateFile = (file: File, criteria: {
  fileFormats?: string[]
  fileSizeLimit?: number
}) => {
  const { name, size } = file
  const { fileFormats, fileSizeLimit } = criteria
  const appStore = useAppStore()

  const invalidType = !!fileFormats && !fileFormats.some(format => name.endsWith(`.${format}`))
  const invalidSize = !!fileSizeLimit && size > fileSizeLimit

  if (invalidType) {
    appStore.$notify.error(i18n.t('formValidation.invalidFileType'))
  }

  if (invalidSize) {
    const size = (fileSizeLimit / Math.pow(2, 20)).toFixed(2)
    appStore.$notify.error(i18n.t('formValidation.invalidFileSize', { size }))
  }

  return !invalidType && !invalidSize
}

export const downloadFile = (fileContent: any, fileName: string, type: string) => {
  const blob = new Blob([fileContent], { type: `application/${type}` })
  const url = window?.URL.createObjectURL(blob)
  const downloadAnchorNode = document.createElement('a')
  downloadAnchorNode.setAttribute('href', url)
  downloadAnchorNode.setAttribute('download', generateFileName(fileName, type))
  document.body.appendChild(downloadAnchorNode)
  downloadAnchorNode.click()
  downloadAnchorNode.remove()
  window.URL.revokeObjectURL(url)
}

export const downloadJSON = (fileContent: any, fileName: string) => downloadFile(JSON.stringify(fileContent), fileName, 'json')
export const downloadZip = (fileContent: any, fileName: string) => downloadFile(fileContent, fileName, 'zip')
export const downloadPdf = (fileContent: any, fileName: string) => downloadFile(fileContent, fileName, 'pdf')
