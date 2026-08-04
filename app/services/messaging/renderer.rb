module Messaging
  class Renderer
    TAG_PATTERN = /#([a-z0-9_.]+)/i

    def initialize(presentation:, membership:)
      @presentation = presentation
      @membership = membership
      @circle = presentation.circle
    end

    def render(template_string)
      return "" if template_string.nil?

      template_string.to_s.gsub(TAG_PATTERN) do
        key = Regexp.last_match(1).to_s
        values.fetch(key, "")
      end
    end

    def values
      {
        "membership.name" => membership.name.to_s,
        "circle.name" => circle&.name.to_s,
        "presentation.name" => presentation.name.to_s,
        "interact_url" => interact_url,
      }
    end

    private

    attr_reader :presentation, :membership, :circle

    def interact_url
      return "" if circle.nil?

      Rails.application.routes.url_helpers.circle_presentation_interact_url(
        circle_slug: circle.slug,
        presentation_slug: presentation.slug,
      )
    end
  end
end
