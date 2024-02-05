class ThemeMembersController < ApplicationController
  include Searchable

  expose :members, -> { search(Theme.find_by(slug: params[:theme_slug]).members.includes_associated, sortable_fields) }
  expose :member, scope: -> { members }, find: ->(id, scope) { scope.includes_associated.find(id) }

  # @route GET /themes/:theme_slug/members (theme_members)
  def index
    render inertia: "Theme/Members/Index"
  end

  # @route GET /themes/:theme_slug/members/:slug (theme_member)
  def show
    render inertia: "Theme/Members/Show"
  end

  # @route GET /themes/:theme_slug/members/new (new_theme_member)
  def new
    render inertia: "Theme/Members/New"
  end

  # @route GET /themes/:theme_slug/members/:slug/edit (edit_theme_member)
  def edit
    render inertia: "Theme/Members/Edit"
  end
end
