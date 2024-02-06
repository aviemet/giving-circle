class ThemeOrgsController < ApplicationController

  # @route GET /themes/:theme_slug/orgs (theme_orgs)
  def index
    render inertia: "ThemeOrgs/Index"
  end

  # @route GET /themes/:theme_slug/orgs/:slug (theme_org)
  def show
    render inertia: "ThemeOrgs/Show"
  end

  # @route GET /themes/:theme_slug/orgs/new (new_theme_org)
  def new
    render inertia: "ThemeOrgs/New"
  end

  # @route GET /themes/:theme_slug/orgs/:slug/edit (edit_theme_org)
  def edit
    render inertia: "ThemeOrgs/Edit"
  end
end
