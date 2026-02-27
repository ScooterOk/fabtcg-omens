import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const PARTIALS_DIR = path.join(ROOT, 'src', 'partials')
const LOCALES_DIR = path.join(ROOT, 'locales')

const LOCALES = ['en', 'ja']

function walk(dir) {
  const out = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...walk(full))
    else if (entry.isFile() && entry.name.endsWith('.html')) out.push(full)
  }
  return out
}

function readJson(file) {
  if (!fs.existsSync(file)) return {}
  const raw = fs.readFileSync(file, 'utf8').trim()
  if (!raw) return {}
  return JSON.parse(raw)
}

function writeJson(file, obj) {
  const sorted = Object.fromEntries(Object.entries(obj).sort(([a], [b]) => a.localeCompare(b)))
  fs.writeFileSync(file, JSON.stringify(sorted, null, 2) + '\n', 'utf8')
}

function extractKeysFromContent(content) {
  const keys = new Set()

  // Match {{key}} and {{ key }} but ignore partial includes like {{> hero-popup}}
  const re = /{{\s*([a-zA-Z0-9_]+)\s*}}/g
  let m
  while ((m = re.exec(content)) !== null) {
    const key = m[1]
    if (key === '>' || key.startsWith('>')) continue
    keys.add(key)
  }
  return keys
}

const files = fs.existsSync(PARTIALS_DIR) ? walk(PARTIALS_DIR) : []
if (!files.length) {
  console.error(`No .html files found in ${PARTIALS_DIR}`)
  process.exit(1)
}

const allKeys = new Set()
for (const file of files) {
  const content = fs.readFileSync(file, 'utf8')
  for (const key of extractKeysFromContent(content)) allKeys.add(key)
}

const keysArr = Array.from(allKeys).sort()

for (const lng of LOCALES) {
  const localeFile = path.join(LOCALES_DIR, `${lng}.json`)
  const data = readJson(localeFile)

  let added = 0
  for (const key of keysArr) {
    if (!(key in data)) {
      // en gets key as placeholder (easy to search/replace), ja gets empty
      data[key] = lng === 'en' ? key : ''
      added++
    }
  }

  writeJson(localeFile, data)
  console.log(`${lng}.json: added ${added} keys (total ${Object.keys(data).length})`)
}

console.log(`Scanned ${files.length} files, found ${keysArr.length} unique keys.`)
