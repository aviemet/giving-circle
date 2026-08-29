module Presentations
  module ElementControls
    class Update
      class SlideNotFound < StandardError; end

      def self.call(presentation:, slide_id:, element_id:, element_type:, control:, value:)
        new(
          presentation: presentation,
          slide_id: slide_id,
          element_id: element_id,
          element_type: element_type,
          control: control,
          value: value,
        ).call
      end

      def initialize(presentation:, slide_id:, element_id:, element_type:, control:, value:)
        @presentation = presentation
        @slide_id = slide_id
        @element_id = element_id
        @element_type = element_type
        @control = control
        @value = value
      end

      def call
        unless @presentation.slides.exists?(id: @slide_id)
          raise SlideNotFound, "slide not found"
        end

        @presentation.merge_element_control!(
          slide_id: @slide_id,
          element_id: @element_id,
          element_type: @element_type,
          control: @control,
          value: @value,
        )

        @presentation
      end
    end
  end
end
