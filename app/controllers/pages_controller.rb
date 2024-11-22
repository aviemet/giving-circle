class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:home]

  # GET /
  # @route GET / (root)
  def home
    render inertia: "Public/Home", props: {}
  end

  protected

  def layout_value
    LAYOUTS[:public]
  end
end
