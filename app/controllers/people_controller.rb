class PeopleController < ApplicationController
  expose :people, -> { search(Person.includes_associated) }
  expose :person, id: -> { params[:slug] }, scope: -> { Person.includes_associated }, find_by: :slug

  strong_params :person, permit: [:first_name, :last_name, :middle_name, :active]

  sortable_fields %w(first_name last_name middle_name active)

  # @route GET /people (people)
  def index
    authorize people

    paginated_people = paginate(people, :people)

    render inertia: "People/Index", props: {
      people: -> { paginated_people.render(:index) },
      pagination: -> { {
        count: people.size,
        **pagination_data(paginated_people)
      } },
    }
  end

  # @route GET /people/:slug (person)
  def show
    authorize person

    render inertia: "People/Show", props: {
      person: -> { person.render(:show) }
    }
  end

  # @route GET /people/new (new_person)
  def new
    authorize Person.new

    render inertia: "People/New", props: {
      person: Person.new.render(:form_data)
    }
  end

  # @route GET /people/:slug/edit (edit_person)
  def edit
    authorize person

    render inertia: "People/Edit", props: {
      person: person.render(:edit)
    }
  end

  # @route POST /people (people)
  def create
    authorize Person.new

    if person.save
      redirect_to person, notice: t('people.notices.created')
    else
      redirect_to new_person_path, inertia: { errors: person.errors }
    end
  end

  # @route PATCH /people/:slug (person)
  # @route PUT /people/:slug (person)
  def update
    authorize person

    if person.update(person_params)
      redirect_to person, notice: t('people.notices.updated')
    else
      redirect_to edit_person_path, inertia: { errors: person.errors }
    end
  end

  # @route DELETE /people/:slug (person)
  def destroy
    authorize person
    person.destroy!
    redirect_to people_url, notice: t('people.notices.destroyed')
  end
end
