class ThemeMembershipsController < ApplicationController
  expose :circle, id: -> { params[:circle_slug] }, scope: -> { Circle }, find_by: :slug
  expose :theme, id: -> { params[:theme_slug] }, scope: -> { Theme }, find_by: :slug

  expose :memberships, -> { search(Membership.where(theme:).includes_associated) }
  expose :membership, find: ->(id, scope){ scope.includes_associated.find(id) }

  strong_params :membership, permit: [:name, :number, :funds, :active]

  sortable_fields %w(name number funds active)

  # @route GET /:circle_slug/themes/:theme_slug/memberships (theme_memberships)
  def index
    authorize memberships

    paginated_memberships = paginate(memberships, :memberships)

    render inertia: "ThemeMemberships/Index", props: {
      memberships: -> { paginated_memberships.render(:index) },
      pagination: -> { {
        count: memberships.size,
        **pagination_data(paginated_memberships)
      } },
    }
  end

  # @route GET /:circle_slug/themes/:theme_slug/memberships/:slug (theme_membership)
  def show
    authorize membership

    render inertia: "ThemeMemberships/Show", props: {
      membership: -> { membership.render(:show) },
      circle: -> { circle.includes_associated.render(:persisted) },
    }
  end

  # @route GET /:circle_slug/themes/:theme_slug/memberships/new (new_theme_membership)
  def new
    authorize Membership.new

    render inertia: "ThemeMemberships/New", props: {
      membership: Membership.new.render(:form_data),
      circle: -> { circle.includes_associated.render(:persisted) },
    }
  end

  # @route GET /:circle_slug/themes/:theme_slug/memberships/:slug/edit (edit_theme_membership)
  def edit
    authorize membership

    render inertia: "ThemeMemberships/Edit", props: {
      membership: membership.render(:edit),
      circle: -> { circle.includes_associated.render(:persisted) },
    }
  end

  # @route POST /:circle_slug/themes/:theme_slug/memberships (theme_memberships)
  def create
    authorize Membership.new

    if membership.save
      redirect_to membership, notice: "Membership was successfully created."
    else
      redirect_to new_member_path, inertia: { errors: membership.errors }
    end
  end

  # @route PATCH /:circle_slug/themes/:theme_slug/memberships/:slug (theme_membership)
  # @route PUT /:circle_slug/themes/:theme_slug/memberships/:slug (theme_membership)
  def update
    authorize membership

    if membership.update(member_params)
      redirect_to membership, notice: "Membership was successfully updated."
    else
      redirect_to edit_member_path, inertia: { errors: membership.errors }
    end
  end

  # @route DELETE /:circle_slug/themes/:theme_slug/memberships/:slug (theme_membership)
  def destroy
    authorize membership

    membership.destroy!
    redirect_to members_url, notice: "Membership was successfully destroyed."
  end
end
