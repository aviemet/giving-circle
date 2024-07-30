class MembersController < ApplicationController
  expose :circle, id: -> { params[:circle_slug] }, scope: -> { Circle.includes_associated }, find_by: :slug

  expose :members, -> { search(circle.members.includes_associated, sortable_fields) }
  expose :member, id: -> { params[:slug] }, scope: -> { members }, find_by: :slug

  expose :circle_members, -> { search(Circle.find_by(slug: params[:circle_slug]).members) }

  strong_params :member, permit: [:first_name, :last_name, :number]

  # @route GET /circles/:circle_slug/members (circle_members)
  def index
    authorize members

    paginated_members = paginate(circle_members, :members)

    render inertia: "Members/Index", props: {
      members: -> { paginated_members.render(:index) },
      pagination: -> { {
        count: circle_members.size,
        **pagination_data(paginated_members)
      } },
      circle: -> { circle.render(:persisted) }
    }
  end

  # @route GET /circles/:circle_slug/members/:slug (circle_member)
  def show
    authorize member

    render inertia: "Members/Show", props: {
      member: -> { member.render(:show) },
      circle: -> { circle.render(:persisted) },
    }
  end

  # @route GET /circles/:circle_slug/members/new (new_circle_member)
  def new
    authorize Member.new

    render inertia: "Members/New", props: {
      member: Member.new.render(:form_data),
      circle: -> { circle.render(:persisted) },
    }
  end

  # @route GET /circles/:circle_slug/members/:slug/edit (edit_circle_member)
  def edit
    authorize member

    render inertia: "Members/Edit", props: {
      member: member.render(:edit),
      circle: -> { circle.render(:persisted) },
    }
  end

  # @route POST /circles/:circle_slug/members (circle_members)
  def create
    authorize Member.new

    if member.save
      redirect_to [:admin, member], notice: "Member was successfully created."
    else
      redirect_to [:admin, new_member_path], inertia: { errors: member.errors }
    end
  end

  # @route PATCH /circles/:circle_slug/members/:slug (circle_member)
  # @route PUT /circles/:circle_slug/members/:slug (circle_member)
  def update
    authorize member

    if member.update(member_params)
      redirect_to [:admin, member], notice: "Member was successfully updated."
    else
      redirect_to [:admin, edit_member_path], inertia: { errors: member.errors }
    end
  end

  # @route DELETE /circles/:circle_slug/members (circle_members)
  # @route DELETE /circles/:circle_slug/members/:slug (circle_member)
  def destroy
    authorize member

    member.destroy
    redirect_to [:admin, members_url], notice: "Member was successfully destroyed."
  end

  private

  def sortable_fields
    %w(first_name last_name number).freeze
  end
end
