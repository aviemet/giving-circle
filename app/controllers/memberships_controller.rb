class MembersController < ApplicationController
  expose :members, -> { search(Member.includes_associated) }
  expose :member, find: ->(id, scope){ scope.includes_associated.find(id) }

  strong_params :member, :number, :funds, :active, :name

  sortable_fields %w(number funds active name)

  def index
    authorize members

    paginated_members = paginate(members, :members)

    render inertia: "Members/Index", props: {
      members: -> { paginated_members.render(:index) },
      pagination: -> { {
        count: members.size,
        **pagination_data(paginated_members)
      } },
    }
  end

  def show
    authorize member
    render inertia: "Members/Show", props: {
      member: -> { member.render(:show) }
    }
  end

  def new
    authorize Member.new
    render inertia: "Members/New", props: {
      member: Member.new.render(:form_data)
    }
  end

  def edit
    authorize member
    render inertia: "Members/Edit", props: {
      member: member.render(:edit)
    }
  end

  def create
    authorize Member.new
    if member.save
      redirect_to member, notice: "Member was successfully created."
    else
      redirect_to new_member_path, inertia: { errors: member.errors }
    end
  end

  def update
    authorize member
    if member.update(member_params)
      redirect_to member, notice: "Member was successfully updated."
    else
      redirect_to edit_member_path, inertia: { errors: member.errors }
    end
  end

  def destroy
    authorize member
    member.destroy!
    redirect_to members_url, notice: "Member was successfully destroyed."
  end

end
