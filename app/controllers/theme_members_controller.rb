class ThemeMembersController < ApplicationController
  expose :theme, id: -> { params[:theme_slug] }, find_by: :slug
  expose :circle, -> { theme.circle }

  expose :members, -> { search(theme.members.includes_associated, sortable_fields) }
  expose :member, id: -> { params[:slug] }, scope: -> { members }, find_by: :slug

  strong_params :member, permit: [:first_name, :last_name, :number]

  # @route GET /circles/:circle_slug/themes/:theme_slug/members (circle_theme_members)
  # @route GET /circles/:circle_slug/themes/:theme_slug/members (circle_theme_member_index)
  def index
    authorize members

    paginated_members = paginate(members, :members)

    render inertia: "Themes/Members/Index", props: {
      members: -> { paginated_members.render(:index) },
      pagination: -> { {
        count: members.size,
        **pagination_data(paginated_members)
      } },
      theme: -> { theme.render(:inertia_share) },
      circle: -> { circle.render(:persisted) }
    }
  end

  # @route GET /circles/:circle_slug/themes/:theme_slug/members/:slug (circle_theme_member)
  def show
    authorize member

    render inertia: "Themes/Members/Show", props: {
      member: member.render(:show),
      theme: -> { theme.render(:inertia_share) },
    }
  end

  # @route GET /circles/:circle_slug/themes/:theme_slug/members/new (new_circle_theme_member)
  def new
    authorize Member.new

    render inertia: "Themes/Members/New", props: {
      member: Member.new.render(:form_data),
      theme: -> { theme.render(:inertia_share) },
    }
  end

  # @route GET /circles/:circle_slug/themes/:theme_slug/members/:slug/edit (edit_circle_theme_member)
  def edit
    authorize member

    render inertia: "Themes/Members/Edit", props: {
      member: member.render(:edit),
      theme: -> { theme.render(:inertia_share) },
    }
  end

  # @route POST /circles/:circle_slug/themes/:theme_slug/members (circle_theme_members)
  def create
    authorize Member.new

    ActiveRecord::Base.transaction do
      if member.save
        theme.members << member
        flash[:notice] = 'Member was successfully created and associated with the theme.'
        redirect_to circle_theme_member_path(circle, theme, member), notice: "Member was successfully created."
      else
        flash[:alert] = 'There was an error creating the member.'
        redirect_to new_circle_theme_member(cirlce, theme), inertia: { errors: member.errors }
      end
    rescue ActiveRecord::RecordInvalid
      flash[:alert] = 'There was an error creating the member.'
      redirect_to new_circle_theme_member(cirlce, theme), inertia: { errors: member.errors }
    end
  end

  # @route PATCH /circles/:circle_slug/themes/:theme_slug/members/:slug (circle_theme_member)
  # @route PUT /circles/:circle_slug/themes/:theme_slug/members/:slug (circle_theme_member)
  def update
    authorize member

    if member.update(member_params)
      redirect_to [:admin, member], notice: "Member was successfully updated."
    else
      redirect_to [:admin, edit_member_path], inertia: { errors: member.errors }
    end
  end

  private

  def sortable_fields
    %w(first_name last_name number).freeze
  end
end
