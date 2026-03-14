class PreviewController < ApplicationController
  skip_before_action :authenticate_user!

  def slide
    render inertia: "Preview/Slide"
  end
end
