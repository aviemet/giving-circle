class PreviewController < ApplicationController
  skip_before_action :authenticate_user!

  # @route GET /preview/slide (preview_slide)
  def slide
    render inertia: "Preview/Slide"
  end
end
