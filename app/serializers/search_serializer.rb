class SearchSerializer < ApplicationSerializer
  object_as :document

  attributes(
    :content,
    :searchable_type,
    :searchable_id,
  )
end
