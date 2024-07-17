class ThemeMembersController < ApplicationController
  expose :theme, id: -> { params[:theme_slug] }, find_by: :slug
  expose :circle, -> { theme.circle }

  expose :members, -> { search(theme.members.includes_associated, sortable_fields) }
  expose :member, id: -> { params[:slug] }, scope: -> { members }, find_by: :slug

  # @route GET /circles/:circle_slug/themes/:theme_slug/members (circle_theme_members)
  def index
    authorize members

    paginated_members = members.page(params[:page] || 1).per(current_user.limit(:items))

    render inertia: "Theme/Members/Index", props: {
      members: -> { paginated_members.render(view: :index) },
      pagination: -> { {
        count: members.size,
        **pagination_data(paginated_members)
      } },
      theme: -> { theme.render(view: :shallow) },
      circle: -> { circle.render(view: :share) }
    }
  end

  # @route GET /circles/:circle_slug/themes/:theme_slug/members/:slug (circle_theme_member)
  def show
    authorize member
    render inertia: "Theme/Members/Show"
  end

  # @route GET /circles/:circle_slug/themes/:theme_slug/members/new (new_circle_theme_member)
  def new
    authorize Member.new
    render inertia: "Theme/Members/New"
  end

  # @route GET /circles/:circle_slug/themes/:theme_slug/members/:slug/edit (edit_circle_theme_member)
  def edit
    authorize member
    render inertia: "Theme/Members/Edit"
  end

  private

  def sortable_fields
    %w(first_name last_name number).freeze
  end

  def member_params
    params.require(:member).permit(:first_name, :last_name, :number)
  end
end
