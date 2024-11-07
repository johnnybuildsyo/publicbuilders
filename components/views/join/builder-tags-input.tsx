import React, { useState } from "react"
import { Tag, TagInput } from "emblor"

export default function BuilderTagsInput() {
  const tags = [
    {
      id: "4180680908",
      text: "Sports",
    },
    {
      id: "2017247588",
      text: "Programming",
    },
    {
      id: "3930906875",
      text: "Travel",
    },
  ]
  const [exampleTags, setExampleTags] = useState<Tag[]>(tags)
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null)

  return (
    <TagInput
      tags={exampleTags}
      setTags={(newTags) => {
        setExampleTags(newTags)
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
