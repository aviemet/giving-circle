class MembershipsController < ApplicationController
  expose :circle, id: -> { params[:circle_slug] }, find_by: :slug

  expose :memberships, -> { search(circle.memberships.includes_associated) }
  expose :membership, id: -> { params[:slug] }, scope: -> { circle.memberships.includes_associated }, find_by: :slug

  strong_params :membership, permit: [:name, :number, :funds, :active, :person_id, person: [:first_name, :last_name]]

  sortable_fields %w(id slug name number funds active)

  # @route GET /:circle_slug/memberships (circle_memberships)
  def index
    authorize memberships

    paginated_memberships = paginate(memberships, :memberships)

    render inertia: "Memberships/Index", props: {
      memberships: -> { paginated_memberships.render(:index) },
      pagination: -> { {
        count: memberships.size,
        **pagination_data(paginated_memberships)
      } },
    }
  end

  # @route GET /:circle_slug/memberships/:slug (membership)
  def show
    authorize membership

    render inertia: "Memberships/Show", props: {
      membership: -> { membership.render(:show) },
      circle: -> { circle.render(:persisted) },
    }
  end

  # @route GET /:circle_slug/memberships/new (new_circle_membership)
  def new
    authorize Membership.new

    render inertia: "Memberships/New", props: {
      membership: Membership.new.render(:form_data),
      circle: -> { circle.render(:persisted) },
    }
  end

  # @route GET /:circle_slug/memberships/:slug/edit (edit_membership)
  def edit
    authorize membership

    render inertia: "Memberships/Edit", props: {
      membership: membership.render(:edit),
      circle: -> { circle.render(:persisted) },
    }
  end

  # @route POST /:circle_slug/memberships (circle_memberships)
  def create
    authorize Membership.new

    membership.circle = circle

    if membership.save
      redirect_to membership_path(params[:circle_slug], membership), notice: t('memberships.notices.created')
    else
      redirect_to new_circle_membership_path(params[:circle_slug]), inertia: { errors: membership.errors }
    end
  end

  # @route PATCH /:circle_slug/memberships/:slug (membership)
  # @route PUT /:circle_slug/memberships/:slug (membership)
  def update
    authorize membership

    if membership.update(membership_params)
      redirect_to membership_path(params[:circle_slug], membership), notice: t('memberships.notices.updated')
    else
      redirect_to edit_membership_path(params[:circle_slug], membership), inertia: { errors: membership.errors }
    end
  end

  # @route DELETE /:circle_slug/memberships/:slug (membership)
  def destroy
    authorize membership

    membership.destroy!
    redirect_to circle_memberships_path(params[:circle_slug]), notice: t('memberships.notices.destroyed')
  end

end
