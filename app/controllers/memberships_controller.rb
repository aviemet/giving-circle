class MembersController < ApplicationController
  expose :circle, id: -> { params[:circle_slug] }, scope: -> { Circle }, find_by: :slug

  expose :memberships, -> { search(Membership.where(circle:).includes_associated) }
  expose :membership, find: ->(id, scope){ scope.includes_associated.find(id) }

  strong_params :membership, permit: %i(name number funds active)

  sortable_fields %w(name number funds active)

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

  def show
    authorize membership

    render inertia: "Memberships/Show", props: {
      membership: -> { membership.render(:show) },
      circle: -> { circle.includes_associated.render(:persisted) },
    }
  end

  def new
    authorize Membership.new

    render inertia: "Memberships/New", props: {
      membership: Membership.new.render(:form_data),
      circle: -> { circle.includes_associated.render(:persisted) },
    }
  end

  def edit
    authorize membership

    render inertia: "Memberships/Edit", props: {
      membership: membership.render(:edit),
      circle: -> { circle.includes_associated.render(:persisted) },
    }
  end

  def create
    authorize Membership.new

    if membership.save
      redirect_to membership, notice: "Membership was successfully created."
    else
      redirect_to new_member_path, inertia: { errors: membership.errors }
    end
  end

  def update
    authorize membership

    if membership.update(member_params)
      redirect_to membership, notice: "Membership was successfully updated."
    else
      redirect_to edit_member_path, inertia: { errors: membership.errors }
    end
  end

  def destroy
    authorize membership

    membership.destroy!
    redirect_to members_url, notice: "Membership was successfully destroyed."
  end

end
