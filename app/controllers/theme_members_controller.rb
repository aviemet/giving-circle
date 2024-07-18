class ThemeMembersController < ApplicationController
  expose :theme, id: -> { params[:theme_slug] }, find_by: :slug
  expose :circle, -> { theme.circle }

  expose :members, -> { search(theme.members.includes_associated, sortable_fields) }
  expose :member, id: -> { params[:slug] }, scope: -> { members }, find_by: :slug

  strong_params :member, permit: [:first_name, :last_name, :number]

  # @route GET /circles/:circle_slug/themes/:theme_slug/members (circle_theme_members)
  def index
    authorize members

    paginated_members = paginate(members, :items)

    render inertia: "Themes/Members/Index", props: {
      members: -> { paginated_members.render(:index) },
      pagination: -> { {
        count: members.size,
        **pagination_data(paginated_members)
      } },
      theme: -> { theme.render(:shallow) },
      circle: -> { circle.render(:share) }
    }
  end

  # @route GET /circles/:circle_slug/themes/:theme_slug/members/:slug (circle_theme_member)
  def show
    authorize member
    render inertia: "Themes/Members/Show"
  end

  # @route GET /circles/:circle_slug/themes/:theme_slug/members/new (new_circle_theme_member)
  def new
    authorize Member.new
    render inertia: "Themes/Members/New"
  end

  # @route GET /circles/:circle_slug/themes/:theme_slug/members/:slug/edit (edit_circle_theme_member)
  def edit
    authorize member
    render inertia: "Themes/Members/Edit"
  end

  private

  def sortable_fields
    %w(first_name last_name number).freeze
  end
end
