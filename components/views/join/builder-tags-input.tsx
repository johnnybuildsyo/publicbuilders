import React, { useState } from "react"
import { Tag, TagInput } from "emblor"

export default function BuilderTagsInput() {
  const tags = [
    { id: "1", text: "frontend" },
    { id: "2", text: "podcast" },
    { id: "3", text: "webdev" },
    { id: "4", text: "community" },
    { id: "5", text: "founder" },
    { id: "6", text: "entrepreneur" },
    { id: "7", text: "speaker" },
    { id: "8", text: "devops" },
    { id: "9", text: "devrel" },
    { id: "10", text: "writing" },
    { id: "11", text: "marketing" },
    { id: "12", text: "content" },
    { id: "13", text: "bootstrapping" },
    { id: "14", text: "builder" },
    { id: "15", text: "apps" },
    { id: "16", text: "saas" },
    { id: "17", text: "nomad" },
    { id: "18", text: "ai" },
    { id: "19", text: "analytics" },
    { id: "20", text: "design" },
    { id: "21", text: "education" },
    { id: "22", text: "buildinpublic" },
    { id: "23", text: "freelance" },
    { id: "24", text: "web3" },
    { id: "25", text: "career" },
    { id: "26", text: "hiring" },
    { id: "27", text: "accessibility" },
    { id: "28", text: "diversity" },
    { id: "29", text: "social media" },
    { id: "30", text: "data" },
    { id: "31", text: "github" },
    { id: "32", text: "open source" },
    { id: "33", text: "developer advocate" },
    { id: "34", text: "nocode" },
    { id: "35", text: "automation" },
    { id: "36", text: "remote work" },
    { id: "37", text: "travel" },
    { id: "38", text: "ceo" },
    { id: "39", text: "cms" },
    { id: "40", text: "notion" },
    { id: "41", text: "digital strategy" },
    { id: "42", text: "transparency" },
  ]

  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags)
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null)

  return (
    <TagInput
      tags={selectedTags}
      setTags={(newTags) => {
        setSelectedTags(newTags)
      }}
      placeholder="Add a tag"
      styleClasses={{
        input: "w-full sm:max-w-[350px]",
      }}
      activeTagIndex={activeTagIndex}
      setActiveTagIndex={setActiveTagIndex}
      enableAutocomplete={true}
    />
  )
}
